import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnResizer extends Component {
  constructor(props) {
    super(props);

    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.tdref = React.createRef();

    this.dragging = false;
    this.mouseX = 0
    this.startPos = 0;
    this.startWidthPrev = 0;
    this.startWidthNext = 0;
  }

  startDrag() {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.dragging = true;
    this.startPos = this.mouseX;

    this.startWidthPrev = 0;
    this.startWidthNext = 0;

    const tdElem = this.tdref.current;

    if (tdElem) {

      const { previousSibling, nextSibling } = tdElem;

      if (previousSibling) {
        this.startWidthPrev = previousSibling.clientWidth;
      }

      if (nextSibling) {
        this.startWidthNext = nextSibling.clientWidth;
      }

      this.resetWidthStyles(tdElem);
    }
  }

  endDrag() {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.dragging = false;
  }

  resetWidthStyles(el) {
    const table = el.closest('table');
    const rowElement = el.closest('tr');
    const { cellIndex } = el;
    const { rowIndex } = rowElement;

    [].forEach.call(table.querySelectorAll('tr'), (row, rowIdx) => {
      if (rowIndex !== rowIdx) {
        const { cells } = row;
        const { previousSibling, nextSibling } = cells.item(cellIndex);
        if (previousSibling && previousSibling.style.width) {
          previousSibling.style.removeProperty('width');
        }
        if (nextSibling && nextSibling.style.width) {
          nextSibling.style.removeProperty('width');
        }
      }
    });
  }

  onMouseMove(e) {
    const { disabled, minWidth } = this.props;
    if (disabled) {
      return;
    }

    this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;
    if (!this.dragging) {
      return;
    }

    const tdElem = this.tdref.current;

    const moveDiff = this.startPos - this.mouseX;
    let newPrev = this.startWidthPrev - moveDiff;
    let newNext = this.startWidthNext + moveDiff;

    if (newPrev < minWidth) {
      const offset = newPrev - minWidth;
      newPrev = minWidth;
      newNext += offset;
    } else if (newNext < minWidth) {
      const offset = newNext - minWidth;
      newNext = minWidth;
      newPrev += offset;
    }

    tdElem.previousSibling.style.width = newPrev + 'px';
    tdElem.nextSibling.style.width = newNext + 'px';
  }

  componentDidMount() {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.addEventListenersToDocument();
  }

  componentWillUnmount() {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.removeEventListenersFromDocument();
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;
    if (prevProps.disabled && !disabled) {
      this.addEventListenersToDocument();
    }

    if (!prevProps.disabled && disabled) {
      this.removeEventListenersFromDocument();
    }
  }

  addEventListenersToDocument() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.endDrag);

    document.addEventListener("touchmove", this.onMouseMove);
    document.addEventListener("touchend", this.endDrag);
  }

  removeEventListenersFromDocument() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.endDrag);

    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.endDrag);
  }

  render() {
    const { disabled, className } = this.props;

    const style = { userSelect: 'none' };

    if (!disabled) {
      style.cursor = 'ew-resize';
    }

    if (className === '') {
      style.width = '6px';
      style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }

    return (
      <td ref={this.tdref}
        style={style}
        className={className}
        onMouseDown={!disabled && this.startDrag}
        onTouchStart={!disabled && this.startDrag} />
    );
  }
}

ColumnResizer.propTypes = {
  disabled: PropTypes.bool,
  minWidth: PropTypes.number,
  className: PropTypes.string,
}

ColumnResizer.defaultProps = {
  disabled: false,
  minWidth: 0,
  className: '',
}

export default ColumnResizer;

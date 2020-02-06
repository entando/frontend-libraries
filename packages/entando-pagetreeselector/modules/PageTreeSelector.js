import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeFolderIcon from 'common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'common/RowSpinner';


class PageTreeSelector extends Component {
  constructor() {
    super();
    this.state = {
      selectedPage: null,
    };
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    if (onDidMount) {
      onDidMount();
    }
  }

  handleRowClick(pageCode) {
    this.setState({
      selectedPage: pageCode,
    });
    const { onPageSelect, input: { onChange } } = this.props;
    if (onPageSelect) {
      onPageSelect(pageCode);
    } else if (onChange) {
      onChange(pageCode);
    }
  }

  renderRows() {
    const {
      pages, onExpandPage,
    } = this.props;
    const { selectedPage } = this.state;

    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          onExpandPage(page.code);
        }
      };
      const className = ['PageTreeSelector__column-td'];
      if (page.isEmpty) {
        className.push('PageTreeSelector__column-td--empty');
      }

      const onRowClick = () => this.handleRowClick(page.code);
      const isPageSelected = selectedPage === page.code;

      return (
        <tr
          key={`${page.code}`}
          className={`PageTreeSelector__row${isPageSelected ? '--selected' : ''}`}
        >
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="PageTreeSelector__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
            </span>
            <span
              className="PageTreeSelector__select-area"
              role="button"
              tabIndex={i}
              onClick={onRowClick}
              onKeyDown={onRowClick}
            >
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTreeSelector__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="PageTreeSelector table table-bordered table-hover table-treegrid">
          <thead>
            <tr>
              <th width="70%">
                <FormattedMessage id="pageTree.pageTree" />
              </th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

PageTreeSelector.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  onExpandPage: PropTypes.func,
  onDidMount: PropTypes.func,
  onPageSelect: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
};

PageTreeSelector.defaultProps = {
  pages: [],
  onExpandPage: () => {},
  onDidMount: null,
  onPageSelect: null,
  input: {},
};

export default PageTreeSelector;

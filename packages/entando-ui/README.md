# Entando UI

this is a theme that can be applied to any Material-UI project.
this package exports the theme directly that can just be applied through a theme provider:

```js
import entandoUI from '@entando/ui';
import { ThemeProvider } from '@material-ui/core/styles';

const app = () => (
  <ThemeProvider theme={entandoUI}>
    <Container>
      <Table />
      <TextInput />
      <Buttons />
      <Radios />
    </Container>
  </ThemeProvider>
);
```

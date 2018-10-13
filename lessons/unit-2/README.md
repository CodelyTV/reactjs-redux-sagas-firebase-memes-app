# Unit 2

This unit installs the [storybook.js](https://storybook.js.org) tool and creates the presentational components of the app.

## Steps

### Storybook.js

When developing reusable components (imagine a basic library of buttons, labels, etc) we need to continuously see if the components works as expected, for example, *if I pass the property `disable` to a button it must look disable*, *if I pass the `loading` property to a label it must show a loading spinner*, etc.

`Storybook.js` allow us to write *stories* (use cases) of our components and it will present in a *live* dashboard that is updated if we change our code. Once finished `Storybook.js` also allows to create a *build* of our stories that can server as a documentation/example for those that are going to use our library.

To install storybook:

- `$ npm i -g @storybook/cli` Install it as a global dependency.
- Go into your project folder `$ cd PROJECT_NAME`
- `getstorybook` run initialization script. It automatically detect the project is CRA based and will update our dependencies and add a couple of scripts into the `package.json` file.

Now if we run storybook `$ yarn run storybook` if will run a server at `http://localhost:9009` showing some example stories.

### Storybook.js addons

Storybooks can be configured with addons, which extends its functionalities. We are going to install:

- [knobs](https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs): 
Knobs allow you to edit React props dynamically using the Storybook UI. You can also use Knobs as dynamic variables inside your stories. `$ yarn add @storybook/addon-knobs --dev`.

- [Viewport](): Viewport allows your stories to be displayed in different sizes and layouts in Storybook. This helps build responsive components inside of Storybook. `$ yarn add @storybook/addon-viewport --dev`

- [JSX preview](https://github.com/storybooks/addon-jsx): 
This addon shows a preview of the JSX code for each story. It allows you to configure the display and copy the code with a single click. `$ yarn add --dev storybook-addon-jsx`

Update the `.storybook/addons.js` file to import the new installed addons. It should look similar to:

```javascript
import '@storybook/addon-knobs/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-actions/register';
import 'storybook-addon-jsx/register';
import '@storybook/addon-links/register';
```

After adding new addons we can the new tabs in the storybook dashboard

![before](../images/009.png)
![after](../images/010.png)

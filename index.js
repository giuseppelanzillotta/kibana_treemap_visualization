export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'treemap',
    uiExports: {
      visTypes: [
        'plugins/treemap/treemap_vis'
      ],
      styleSheetPaths: `${__dirname}/public/index.scss`,
    }
  });
}


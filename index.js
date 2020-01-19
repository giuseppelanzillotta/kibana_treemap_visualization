import { resolve } from 'path';
import { existsSync } from 'fs';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'treemap',
    uiExports: {
      visTypes: [
        'plugins/treemap/treemap_vis'
      ],
      styleSheetPaths: [resolve(__dirname, 'public/index.scss'), resolve(__dirname, 'public/index.css')].find(p => existsSync(p))
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    }
  });
}

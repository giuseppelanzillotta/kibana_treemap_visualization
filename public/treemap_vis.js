import TreemapVisualizationController from './treemap_vis_controller';
import {Schemas} from 'ui/vis/editors/default/schemas';
import {visFactory} from 'ui/vis/vis_factory';
import { setup as visualizations } from '../../../src/legacy/core_plugins/visualizations/public/np_ready/public/legacy';
import image from './images/treemap.svg';

visualizations.types.registerVisualization(TreemapVisualizationProvider);


function TreemapVisualizationProvider() {

  return visFactory.createBaseVisualization({
    name: 'treemap_visualization',
    title: 'Treemap',
    image,
    description: 'Display values in a treemap visualization',
    visualization: TreemapVisualizationController,
    editorConfig: {
      schemas: new Schemas([{
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        aggFilter: ['!derivative', '!geo_centroid', '!geo_bounds', '!cumulative_sum','!moving_avg','!serial_diff'],
        defaults: [{
          type: 'count',
          schema: 'metric'
        }]
      }, {
        group: 'buckets',
        name: 'segment',
        title: 'Bucket Split',
        min: 0,
        aggFilter: ['!geohash_grid', '!filter']
      }]),
    }
  });
}

export default TreemapVisualizationProvider;
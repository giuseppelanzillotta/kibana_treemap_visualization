import {
  renderTreeMap
} from './treemap_d3';

export default class TreemapVisualizationController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render(table, status) {
    this.destroy();
    var treemap = document.createElement('div');
    treemap.setAttribute("id", "treemap");
    treemap.setAttribute("class", "treemapclass");
    this.el.appendChild(treemap);
    var values = [];
    table.rows.forEach(function(entry) {
      values.push(renameRow(entry, table.columns));
    });
    var keyLabels = getKeyLabels(table.columns);
    var data = nestData(values, keyLabels);
    var parent = $('#treemap').closest('.visualization');
    renderTreeMap({
      childLabels: keyLabels,
      vis: this.vis,
      table: table,
      width: parent.width(),
      height: parent.height()
    }, {
      key: "test",
      values: data
    });
    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }
};

function nestData(values, keyLabels) {
  var data = d3.nest();
  keyLabels.forEach(function(key) {
    data.key(function(d) {
      return d[key];
    })
  });
  data = data.entries(values);
  return data;
}

function renameRow(row, columns) {
  var result = new Object();
  for (const [key, value] of Object.entries(row)) {
    result[getKeyName(key, columns)] = value;
  }
  return result;
}

function getKeyName(key, columns) {
  var result = "";
  columns.forEach(function(entry) {
    var str=entry.name.split(" ");

    if (entry.id == key) {
      if (str[0] === "Count" || str[0]==="Average"|| str[0]==="Max" ||str[0]==="Median"||str[0]==="Min"|| str[0]==="Sum") {
        result = "value";
      } else {
        result = entry.name;
      }
    }
  });
  return result;
}

function getKeyLabels(columns) {
  var keyLabels = [];  
  columns.forEach(function(entry) {
    var str=entry.name.split(" ");
    if (str[0]!=="Count" || str[0]!=="Average" || str[0]!=="Max"||str[0]!=="Median"||str[0]!=="Min"||str[0]!=="Sum") {
      keyLabels.push(entry.name);
    }
  });
  return keyLabels;
}
export default class Registry {
  constructor(){
    this.layers = [];


  }

  addLayer(layer){
    this.layers.push({
      index: this.layers.length,
      data: layer
    })
  }

  printLayers(){
    console.log(this.layers)
  }

}

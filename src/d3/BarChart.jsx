import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';
import {select} from 'd3-selection';
import {axisBottom} from 'd3-axis';

class BarChart extends Component {

  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear().domain([0, dataMax]).range([0, this.props.size[1]])

    select(node)
    .selectAll('rect')
    .data(this.props.data)
    .enter()
    .append('rect')

    select(node)
    .selectAll('rect')
    .data(this.props.data)
    .exit()
    .remove()

    select(node)
    .selectAll('rect')
    .data(this.props.data)
    .style('fill', '#00ffff')
    .attr('x', (d, i) => i * 26)
    .attr('y', d => this.props.size[1] - yScale(d))
    .attr('height', d => yScale(d))
    .attr('width', 25)

    select(node)
    .append("g")
    .attr("transform", "translate(5,305)")
    .attr("class", "axisWhite")
    .call(axisBottom(yScale));


  }

  render() {
    return <svg ref={node => this.node = node} width={335} height={335}></svg>
  }
}

export default BarChart

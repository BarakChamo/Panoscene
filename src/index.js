import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'aframe-text-geometry-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
      videoId: '#v1',
      zoomed: undefined,
  }

  onClick = (e) => {
    this.setState({ videoId: `#v${e.target.id.split("sphere")[1]}` })
  }

  onMouseEnter = (e) => {
    this.setState({ zoomed: +e.target.id.split("sphere")[1] })
  }

  onMouseLeave = () => {
    this.setState({zoomed: 0})
  }

  renderSphere = (i, rotation) => {
    const animate = i === this.state.zoomed

    return (
    <Entity
      rotation={`0 ${rotation} 0`}
      events={{
        click: this.onClick,
        mouseenter: this.onMouseEnter,
        mouseleave: this.onMouseLeave,
      }}
    >
      <a-sphere
        id={`sphere${i}`}
        src={`#v${i}`}
        opacity="0.6"
        material="metalness: 0.3;"
        animation__rotate="property: rotation; dur: 10000; loop: true; to: 0 360 0; easing: linear;"
        position="0 1.5 -5"
      >
        { animate && (
          [<a-animation attribute="material.opacity" from="0.6" to="1.0" />, <a-animation attribute="position" from="0 1.5 -5" to="0 1.5 -3.5"/>]
        )}
        {!animate && (
          [<a-animation attribute="material.opacity" from="1.0" to="0.6"/>, <a-animation attribute="position" from="0 1.5 -3.5" to="0 1.5 -5" />]
        )}
      </a-sphere>
    </Entity>
  )}

  render () {
    return (
      <Scene>
        <a-assets>
          <video id="v1" src="/1.mp4" loop autoPlay muted={this.state.videoId === 'v1'} />
          <video id="v2" src="/2.mp4" loop autoPlay muted={this.state.videoId === 'v2'} />
          <video id="v3" src="/3.mp4" loop autoPlay muted={this.state.videoId === 'v3'} />
          <video id="v4" src="/4.mp4" loop autoPlay muted={this.state.videoId === 'v4'} />
          <video id="v5" src="/5.mp4" loop autoPlay muted={this.state.videoId === 'v5'} />

          <a-mixin id="unfade" attribute="material.opacity" from="0.6" to="1.0"></a-mixin>
          <a-mixin id="fade" attribute="material.opacity" from="1.0" to="0.6"></a-mixin>
          <a-asset-item id="font" src="/typeface.json"></a-asset-item>
        </a-assets>

        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>

        <a-videosphere src={this.state.videoId} />

        <a-entity position="-0.8 2 -1" text-geometry="font: #font; value: Choose a Panoscene; bevelEnabled: true; bevelSize: 0.005; bevelThickness: 0.005; curveSegments: 12; size: 0.15; height: 0;" material="color:white; metalness:0.5; roughness: 0;" opacity="0.66" scale="" visible=""></a-entity>

        {this.renderSphere(1, 0)}
        {this.renderSphere(2, -30)}
        {this.renderSphere(3, -60)}
        {this.renderSphere(4, 30)}
        {this.renderSphere(5, 60)}

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'))

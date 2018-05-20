import React from 'react';
import { shuffleArray } from '../../utils';
const TOTAL_PARAGRAPHS = 400;

class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      text: []
    };
    this.renderText = this.renderText.bind(this);
  }
  componentDidMount() {

    this.renderText();
  }
  renderText() {
    const text = [];
    for (let i = 0; i < TOTAL_PARAGRAPHS; i++)
      text.push(<p id={`wallpaper-${i}`} key={i} style={{ animationDelay: `${i * 100}ms`, transform: `scale(${1 + (i / 400)})` }}>joy<span>ería</span></p>);
    this.setState({ text: shuffleArray(text) });
  }
  render() {
    return (
      <div className="wallpaper">
        {this.state.text}
      </div>
    );
  }
}

export default Wallpaper;

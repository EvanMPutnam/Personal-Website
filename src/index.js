import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const loadedArticles = require("./articles/projects.json")

class Article extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="Article">
                <div class="w3-card-4 w3-margin w3-white">
                    <div class="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span class="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div class="w3-container">
                        <div dangerouslySetInnerHTML={ {__html: this.props.article['text']} }></div>
                        <div class="w3-row">
                            <div class="w3-col m8 s12">
                            <p><button class="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>« BACK</b></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

    handleClick() {
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
    }
}

class ArticleSummarySection extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    render() {
        return (
            <div className="Article-Summary">
                <div class="w3-card-4 w3-margin w3-white">
                    <div class="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span class="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div class="w3-container">
                        <p>{this.props.article['summary']}</p>
                        <div class="w3-row">
                            <div class="w3-col m8 s12">
                            <p><button class="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>READ MORE »</b></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

    handleClick() {
        const properties = this.props.article;
        ReactDOM.render(
            <Article article={properties} />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
    }
}

class RelevantArticleContainer extends React.Component {
    render() {
        const listItems = loadedArticles["Articles"].map((article) =>
            <ArticleSummarySection article={article}/>
        );
        listItems.reverse();
        return (
            <div className="Article-Summary-Container">
                {listItems}
            </div>
        );
    };
}


ReactDOM.render(
    <RelevantArticleContainer />,
    document.getElementById('articlePosts')
);


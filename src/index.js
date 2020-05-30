import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const loaded_articles = require("./articles/projects.json")

class ArticleSummarySection extends React.Component {
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
                            <p><button class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

class RelevantArticleContainer extends React.Component {
    render() {
        return (
            <div className="Article-Summary-Container">
                <ArticleSummarySection article={loaded_articles["Articles"][0]}/>
                <ArticleSummarySection article={loaded_articles["Articles"][1]}/>
                <ArticleSummarySection article={loaded_articles["Articles"][2]}/>
            </div>
        );
    };
}


ReactDOM.render(
    <RelevantArticleContainer />,
    document.getElementById('articlePosts')
);

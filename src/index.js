import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const loaded_articles = require("./articles/projects.json")

class ShoppingList extends React.Component {
    render() {
        return (
        <div className="shopping-list">
            <h1>Shopping List for {this.props.name}</h1>
            <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
            </ul>
        </div>
        );
    }
}


class Article extends React.Component {

    render() {
        return (
            <div className="Article-Summary-Block">
                <h1>{this.props.article['title']}</h1>
                <div dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div>
        );
    }
    createMarkup(){
        return {__html: this.props.article['text']};
    }
}

class ArticleSummaryBlock extends React.Component {
    render() {
        return (
            <div className="Article-Summary-Block">
                <h1>{this.props.article['title']}</h1>
                <p>{this.props.article['summary']}</p>
                <Article article={this.props.article}/>
            </div>
        );
    }
}

class ArticleSummarySection extends React.Component {
    render() {
        return (
            <div className="Article-Summary-Section">
                <ArticleSummaryBlock article={loaded_articles["Articles"][0]}/>
                <ArticleSummaryBlock article={loaded_articles["Articles"][1]}/>
                <ArticleSummaryBlock article={loaded_articles["Articles"][2]}/>
            </div>
        );
    }


}


ReactDOM.render(
    <ArticleSummarySection />,
    document.getElementById('root')
);

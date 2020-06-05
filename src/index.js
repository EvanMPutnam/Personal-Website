import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MAX_ARTICLES_PER_PAGE = 5

const loadedArticles = require("./articles/projects.json")

var articleCount = 0;

class Article extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="Article article_block">
                <div className="w3-card-4 w3-margin w3-white">
                    <div className="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span className="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div className="w3-container">
                        <div dangerouslySetInnerHTML={ {__html: this.props.article['text']} }></div>
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                            <p><button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>« BACK</b></button></p>
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
                <div className="w3-card-4 w3-margin w3-white">
                    <div className="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span className="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div className="w3-container">
                        <p>{this.props.article['summary']}</p>
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                            <p><button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>READ MORE »</b></button></p>
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
        var listItems = loadedArticles["Articles"].map((article) =>
            <ArticleSummarySection article={article} key={article.title}/>
        );
        listItems.reverse();

        if ((MAX_ARTICLES_PER_PAGE * articleCount) >= listItems.length) {
            articleCount -= 1
        } 
        const elemsLeft = listItems.length - (MAX_ARTICLES_PER_PAGE * articleCount)
        const startingIndex = MAX_ARTICLES_PER_PAGE * articleCount

        if ( elemsLeft > MAX_ARTICLES_PER_PAGE ) {
            listItems = listItems.slice(startingIndex, startingIndex + MAX_ARTICLES_PER_PAGE)
        } else {
            listItems = listItems.slice(startingIndex, startingIndex + elemsLeft)
        }

        return (
            <div className="Article-Summary-Container">
                {listItems}
                <button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleBackward}><b>« PREV</b></button>
                <button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleForward}><b>NEXT »</b></button>
            </div>
        );
    };

    handleForward () {
        articleCount += 1
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
    }

    handleBackward () {
        if ( articleCount > 0 ) {
            articleCount -= 1
        }
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
    }
}


class PopularPost extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render () {
        return (
            <div className="Popular-Post">
                <button className="popular_button" onClick={this.handleClick}>
                    <ul className="w3-ul w3-hoverable w3-white">
                        <li className="w3-padding-16">
                            <span className="w3-large">{this.props.article.title}</span><br/>
                            <span>{this.props.article.date}</span>
                        </li>
                    </ul>
                </button>
            </div>
        );
    }

    handleClick () {
        const properties = this.props.article;
        ReactDOM.render(
            <Article article={properties} />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
    }
}

class PopularPosts extends React.Component {
    render () {
        var listItems = loadedArticles["Articles"].map((article) =>
            <ArticleSummarySection article={article} key={article.title}/>
        );
        listItems.reverse();

        return (
            <div className="Popular-Posts">
                <PopularPost  article={listItems[0].props.article} />
                <PopularPost  article={listItems[1].props.article} />
            </div>
        );
    }
}




articleCount = 0;
ReactDOM.render(
    <RelevantArticleContainer />,
    document.getElementById('articlePosts')
);

ReactDOM.render(
    <PopularPosts />,
    document.getElementById('popularPosts')
);


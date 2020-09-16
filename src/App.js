import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from "words-to-numbers";
const alanKey = '22aa316f86752c1c4c4a170d7bec1b212e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const classes = useStyles();

    const [newsArticles, setNewsArticles] = useState([]);

    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                    setActiveArticle(prevActiveArticle => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parsedNumber = number.length > 1 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNumber - 1];
                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.');
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        });
    }, []);

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
};

export default App;
import React from "react";




function Article({ imageToUrl, title, author, description, publishedAt, link }) {

    // console.log(imageToUrl ,"\n", title , "\n" , author , "\n" , description , "\n", publishedAt)

    return (
        <div className="article">
            <img src={imageToUrl} alt="Not Found" />
            <div className="title">
                <h3>{title}</h3>
            </div>
            <p><i>Author</i>: {author}</p>
            <p className="description"><i>Description</i>: {description}</p>
            <p><i>Published Date</i>: {publishedAt}</p>
            <a href={link}>More Info</a>
        </div>
    )
}

function App() {


    const [articlesData, setArticleData] = React.useState({ status: false, data: false });
    const [query, setQuery] = React.useState("cybersecurity");

    React.useEffect(() => {
        setArticleData({ status: false, data: false })
        async function getData() {
            try {
                let d = new Date();
                let response = await fetch(`https://newsapi.org/v2/everything?q=software&from=${d.getFullYear()}-${d.getUTCMonth()}-${d.getDate()}&sortBy=publishedAt&apiKey=08fe3addd41641368dc353b02a66dbb4`);
                let data = await response.json();
                // console.log(data.articles)
                if (data.status === 'error' || data.totalResults === 0) {
                    throw new Error("Unable to Fetch Data");
                }
                setArticleData({ status: true, data: data })
            } catch (error) {
                setArticleData({ status: true, data: false })
                console.log("Error Generated: " + error);
            }
        }
        getData();
    }, [query]);

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(event)
        let value = document.getElementById('inputBox').value;
        // console.log(value)
        setQuery(value)
    }



    return (
        <>
            <header>
                <h2> News App Using React</h2>
                <ul>
                    <li onClick={() => setQuery("cricket")}>Cricket</li>
                    <li onClick={() => setQuery('politics')}>Politics</li>
                    <li onClick={() => setQuery('latest')}>Latest</li>
                </ul>
            </header>

            <form action="#" onSubmit={handleSubmit}>
                <input type="text" placeholder={"Enter keyword eg.India"} id="inputBox" />
                <button onClick={handleSubmit}>Search</button>
            </form>


            <section>
                {articlesData.status ? articlesData.data ?
                    articlesData.data.articles.map((article, i) => {
                        if (article.urlToImage !== null)
                            return (
                                <Article imageToUrl={article.urlToImage} title={article.title} key={i} author={article.author} description={article.description} publishedAt={article.publishedAt} link={article.url} />
                            )

                    }
                    )
                    : "Unabel To Fetch Data" : <div className="loader"></div>}
            </section>
        </>
    )
}

export default App;
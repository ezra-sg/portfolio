import 'ezra-sg-portfolio--styles/dist/index.css';

export default function App() {
    return (
        <>
            <p>Hello world! React App</p>
            <a href={ process.env.REACT_APP_HOME_APP_URL }>Home</a>
            <br></br>
            <a href={ process.env.REACT_APP_VUE_APP_URL }>Vue</a>
        </>
    );
}

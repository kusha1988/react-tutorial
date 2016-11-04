var React = require('react');
var {Link} = require('react-router');

var Examples = (props) => {
    return (
        <div>
            <h1 className="text-center page-title">Examples</h1>
            <p>Here are a few examples locations try out:</p>
            <ol>
                <li>
                    <Link to="/?location=Cologne">Cologne, GE</Link>
                </li>
                <li>
                    <Link to="/?location=Kyiv">Kyiv, UA</Link>
                </li>
            </ol>
        </div>
    );
};

module.exports = Examples;
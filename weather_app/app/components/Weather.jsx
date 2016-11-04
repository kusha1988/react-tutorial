var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({

    getInitialState: function(){
        return {
            isLoading: false,
            errorMessage: undefined
        }
    },

    componentDidMount: function(){
        var location = this.props.location.query.location;
        if(location && location.length > 0){
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },

    componentWillReceiveProps: function(newProps){
        var location = newProps.location.query.location;
        if(location && location.length > 0){
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },

    handleSearch: function(location){
        var self = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        });

        openWeatherMap.getTemp(location).then(function(temp){
            self.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }, function(e){
            self.setState({
                isLoading: false,
                errorMessage: e.message
            });
        });
    },

    render: function(){
        var { errorMessage, isLoading, temp, location } = this.state;

        function renderMessage(){
            if(isLoading){
                return <h3>Fetching weather...</h3>;
            } else if(temp && location){
                return <WeatherMessage location={location} temp={temp}/>;
            }
        }

        function renderError(){
            if(typeof errorMessage === 'string'){
                return (<ErrorModal message={errorMessage}/>);
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;
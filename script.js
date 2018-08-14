class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            running: false,
            laps: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
            this.calculate();
    }

    calculate() {
        let { minutes, seconds, miliseconds } = this.state.times;

        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        })
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    save() {
        const results = this.state.results.slice();
        results.push(this.format(this.state.times));
        this.setState({ results: results });
    }

    clear() {
        this.setState({ results: [] });
    }

    render() {
        return (
            <div>
                <div className="controls">
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                    <button onClick={this.save}>Save</button>
                    <button onClick={this.clear}>Clear</button>
                </div>
                <div className="stopwatch">
                    {this.format(this.state.times)}
                </div>
                <ul className="results">
                    {this.state.results.map(result => <li>{result}</li>)}
                </ul>
            </div>
        )
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);

import React from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';
import { maps } from '../services/maps';
import '../assets/sidebar.css';

//this compoent renders the sidebar form to enter route details
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.fromInput = React.createRef();
        this.toInput = React.createRef();
        this.state = {
            from: '',
            to: '',
            isSubmit: false
        }
    }
    fromInputAutoComplete;

    toInputAutoComplete;
    updateInput = () => {
        this.setState({
            from: this.fromInput.value,
            to: this.toInput.value,
            isSubmit: true,
            showToCross: true,
            showFromCross: true
        });

    }


    getRoute = () => {
        const from = this.fromInputAutoComplete.getPlace();
        const to = this.toInputAutoComplete.getPlace();
        this.props.getDirections(from, to);
    };
    clearState = () => {
        this.setState({
            to: '',
            from: '',
            isSubmit: false,
            showFromCross: false,
            showToCross: false
        })
    }

    renderAutoComplete = async () => {
        const maps = await this.props.maps();

        this.fromInputAutoComplete = new maps.places.Autocomplete(
            this.fromInput
        );

        this.toInputAutoComplete = new maps.places.Autocomplete(this.toInput);
    };


    componentDidMount() {
        this.renderAutoComplete();
    }
    static defaultProps = {
        maps
    }
    handleSubmit = () => {
        if (this.toInput.value.length === 0 || this.fromInput.value.length === 0) {
            alert("both fields are required!")
        }
        else {
            this.updateInput();
            this.getRoute();
        }
    }

    setInputValue = (e) => {

        e.target.name === 'to' ? (this.setState(
            { to: this.toInput.value, from: this.fromInput.value, showToCross: true }
        )) : (
                this.setState(
                    { to: this.toInput.value, from: this.fromInput.value, showFromCross: true }
                ))
    }

    render() {
        return (

            <Form style={{ margin: '10%' }}>
                <Form.Field>
                    <label style={{ fontWeight: 'bold', fontSize: '1em' }}>Start Location</label>
                    <input name='from' placeholder='Start Location' value={this.state.from} onChange={(e) =>

                        this.setInputValue(e)
                    }
                        ref={el => this.fromInput = el} /> {

                        this.state.showFromCross && <Icon className='icon'
                            onClick={() => { this.setState({ from: '', showFromCross: false }) }}
                            name="close" />}

                </Form.Field>
                <Form.Field>
                    <label style={{ fontWeight: 'bold', fontSize: '1em' }}>Drop Location</label>
                    <input name='to' placeholder='Drop Location' value={this.state.to} onChange={(e) =>

                        this.setInputValue(e)
                    } ref={el => this.toInput = el} />
                    {
                        this.state.showToCross && <Icon className='icon' name="close"
                            onClick={() => { this.setState({ showToCross: false, to: '' }) }} />}
                </Form.Field>
                <div style={{ textAlign: 'center' }}>
                    <Button primary onClick={this.handleSubmit} >{this.state.isSubmit ? 'Re-Submit' : 'Submit'}</Button>
                    <Button secondary onClick={this.clearState}>Reset</Button>
                </div>
            </Form>

        )
    }
}
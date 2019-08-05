import React, { Component } from 'react';
//importer pour créer des liens
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// Importer pour ajouter dynamiquement des class au composants 
import classnames from 'classnames';
// On importe l'action
import { addProjectTask } from '../../actions/projectTaskActions';


class AddProjectTask extends Component {

    // contructeur
    constructor() {
        super();
        // State initial
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            errors: {}
        };

        // On fait le binding
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Cette méthode est exécutée lorsque le state change
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            // En cas d'erreur on récupère les erreurs
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    // La méthode qui gère les changements d'état
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // La méthode qui gère la soumission du formulaire
    onSubmit = (e) => {
        // Pour éviter le rafraichissement automatique de la page après soumission
        e.preventDefault();
        // On crée un nouvel objet projet task
        const newProjectTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        };
        //console.log(newProjectTask);
        // On lance l'action d'ajout
        this.props.addProjectTask(newProjectTask, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/" className="btn btn-light">
                                Back to Board
                            </Link>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",
                                    {"is-invalid": errors.summary})} name="summary" placeholder="Project Task summary"
                                    value={this.state.summary} onChange={this.onChange}/>
                                    {/* Pour afficher l'erreur éventuelle liée à summary */}
                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback">{errors.summary}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria} onChange={this.onChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
    {
        errors: state.errors
    }
)

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
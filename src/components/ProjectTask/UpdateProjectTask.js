import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getProjectTask, addProjectTask } from '../../actions/projectTaskActions';

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        const {
            id,
            summary,
            acceptanceCriteria,
            status
        } = nextProp.project_task;


        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status
        });
    }

    // Cette méthode s'exécute juste après le chargement de la page
    componentDidMount() {
        // On récupère l'Id depuis les params
        const { pt_id } = this.props.match.params;
        // On récupère le project task depuis le serveur à l'aide de l'id
        this.props.getProjectTask(pt_id, this.props.history);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const updateTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        };

        // On lance l'action d'ajout. Le update est effectué à cause de l'existence de l'id dans l'objet
        this.props.addProjectTask(updateTask, this.props.history);
    }

    render() {
        // On récupère les erreurs éventuelles
        const {errors} = this.props;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="ProjectBoard.html" className="btn btn-light">
                                Back to Board
                    </a>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",
                                    {"is-invalid": errors.summary})} name="summary" placeholder="Project Task summary"
                                        value={this.state.summary} onChange={this.onChange} />
                                        {/* Pour afficher l'erreur éventuelle liée à summary */}
                                        {errors.summary &&
                                        <div className="invalid-feedback">{errors.summary}</div>}
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria} onChange={this.onChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status"
                                        value={this.state.status} onChange={this.onChange}>
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


UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addProjectTask: PropTypes.func.isRequired

}

const mapStateToProps = (state) => {
    return {
        project_task: state.project_task.project_task,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { getProjectTask, addProjectTask })(UpdateProjectTask);
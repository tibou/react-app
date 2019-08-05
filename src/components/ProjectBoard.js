import React, { Component } from "react";
// Importer pour créer des liens vers les routes créées  dans le App.js
import { Link } from 'react-router-dom';
// Pour connecter le composant au store
import { connect } from 'react-redux';
// Pour déclarer les méthodes et les objets dont a besoin notre composant
import PropTypes from 'prop-types';
// On importe ce composant qui permet d'afficher chaque Item
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';
// On importe l'action qui permet de récupérer tous les project tasks
import { getBacklog } from '../actions/projectTaskActions';

class ProjectBoard extends Component {
    // Cette méthode est exécutée juste après le chargement du composant
    componentDidMount() {
        // On déclenche la récupération des données
        this.props.getBacklog();
    }

    render() {
        // On récupère les projects task dans cette variable
        const { project_tasks } = this.props.project_tasks;

        let boardContent;
        let todoItems = [];
        let inProgessItems = [];
        let doneItems = [];

        const boardAlgorithm = (project_tasks) => {
            // S'il n'y a pas de projects task, alors on affiche un message
            if (project_tasks.length < 1) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No project tasks on this board
                    </div>
                );
            } else {
                // On constitue la liste des ProjectTaskItem se basant sur les project task
                const tasks = project_tasks.map(project_task => {
                    return (<ProjectTaskItem key={project_task.id} project_task={project_task} />);
                });

                // On parcours la liste des project tasks pour les classifier selon le status
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].props.project_task.status === "TO_DO") {
                        todoItems.push(tasks[i]);
                    }

                    if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                        inProgessItems.push(tasks[i]);
                    }

                    if (tasks[i].props.project_task.status === "DONE") {
                        doneItems.push(tasks[i]);
                    }
                }
            }

            return (
                <React.Fragment>
                    {/*  <!-- Backlog STARTS HERE --> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
                                    </div>
                                </div>

                                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
                                {/* On affiche les Items todo */}
                                {todoItems}

                                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-primary text-white">
                                        <h3>In Progress</h3>
                                    </div>
                                </div>
                                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
                                {/* On affiche les Items inProgres */}
                                {inProgessItems}
                                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-success text-white">
                                        <h3>Done</h3>
                                    </div>
                                </div>
                                {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->
        
                            <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                                {/* On affiche les Items done */}
                                {doneItems}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        // On récpère une référence vers l'algo
        boardContent = boardAlgorithm(project_tasks);

        return (
            <div className="container">
                {/* Faire un lien vers une route */}
                <Link to="/addProjectTask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {/* On affiche le contenu de l'algo */}
                {boardContent}
            </div>
        );

    }
}

// On lie les fonctions et objets à notre composant
ProjectBoard.propType = {
    getBacklog: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired
}

// On mappe le state au props du composant
const mapStateToProp = (state) => {
    return {
        project_tasks: state.project_task
    }
}

// On connecte le composant au store
export default connect(mapStateToProp, { getBacklog })(ProjectBoard);
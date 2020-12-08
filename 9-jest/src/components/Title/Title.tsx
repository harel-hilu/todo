import React from 'react';
import PropTypes from 'prop-types';

export default function Title({doneTasks, totalTasks}: any) {
    return (
        <h1>
            {totalTasks ? doneTasks + "/" + totalTasks + " tasks" :
                         "Create your first task" }
        </h1>
    );
}

Title.propTypes = {
    doneTasks: PropTypes.number,
    totalTasks: PropTypes.number
}

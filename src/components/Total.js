const Total = ({sections}) => {
    let totalExercises = 0;
    sections.forEach(section => {
        totalExercises += section.exercises;
    });

    return (
        <p><strong>total of {totalExercises} exercises</strong></p>
    )
}

export default Total      
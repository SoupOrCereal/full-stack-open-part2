const Total = ({sections}) => {
   const totalExercises = sections.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
    );

    return (
        <p><strong>total of {totalExercises} exercises</strong></p>
    )
}

export default Total      
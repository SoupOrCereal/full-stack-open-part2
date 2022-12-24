const Part = ({part, exercises}) => <p>{part} {exercises}</p>
  
const Content = ({sections}) => {
    const parts = sections.map(section => (
        <Part key={section.id} part={section.name} exercises={section.exercises} />
      ));
    return (
        <>
            {parts}
        </>
    )
}

export default Content
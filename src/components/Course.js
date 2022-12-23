import Header from "./Header"
import Content from "./Content"

const Course = (props) => {
    console.log(props)
    const {course} = props;

    return (
        <div>
          <Header course={course.name} />
          <Content sections={course.parts} />
        </div>
      )
}
  
export default Course
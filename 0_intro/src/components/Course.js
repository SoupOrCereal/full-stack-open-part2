import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = (props) => {
    console.log(props)
    const {course} = props;

    return (
        <div>
          <Header title={course.name} />
          <Content sections={course.parts} />
          <Total sections={course.parts} />
        </div>
      )
}
  
export default Course
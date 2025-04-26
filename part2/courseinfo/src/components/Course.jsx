const Header = props => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = props => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}

const Content = props => {
    console.log('props.parts', props.parts)
    return (
        <>
            {props.parts.map(part => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        </>
    )
}

const Total = props => {
    return (
        <>
            <p>Total of {props.total} exercises</p>
        </>
    )
}

const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total
                        total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
                    />
                </div>
            ))}
        </>
    )
}

export default Course;

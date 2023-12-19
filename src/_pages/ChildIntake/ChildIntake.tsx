import ChildIntakeForm from '../../components/ChildIntakeForm'
import "./childIntake.css"
const ChildIntake = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="d-flex justify-content-center child_intake_container">
          <ChildIntakeForm />
        </div>
      </div>
      <div className="copyright text-center" style={{ borderTop: "0px" }}>
        © 2023 Mental Support. All rights reserved
      </div>
    </>
  )
}

export default ChildIntake
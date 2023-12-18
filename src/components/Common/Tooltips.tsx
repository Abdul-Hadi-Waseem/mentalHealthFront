import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

function Tooltips({arbitrary} : any) {
  return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className=" position-relative"
        // style={{ minHeight: "240px" }}
      >
        <ToastContainer
          className="p-3"
          position={"top-end"}
          style={{ zIndex: 1, position: "fixed" }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Contact Us</strong>
            </Toast.Header>
            <Toast.Body>{arbitrary}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
  )
}

export default Tooltips

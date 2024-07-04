import { Alert, List } from 'flowbite-react'

const FormStatus = ({ status, errors = [], className, ...props }) => (
    <>
        {status && (
          <Alert className={`${className}`} color="success" {...props}>
            <span className="font-bold">Success!</span> {status}
          </Alert>
        )}
        {errors && errors.length > 0 && (
          <Alert
            className={`${className}`}
            color="failure"
            additionalContent={(
              <List className="text-sm text-red-600">
                {errors.map((error, index) => (
                  <List.Item key={index}>{error}</List.Item>
                ))}
              </List>
            )}
            {...props}
          >
            <span className="font-bold">Error!</span>
          </Alert>
        )}
    </>
)

export default FormStatus

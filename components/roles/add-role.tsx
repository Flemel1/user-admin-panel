import { Button, Divider, Input, Modal, Radio, Text } from "@nextui-org/react"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { createdUser } from "../../redux/user-slice"
import { fetchRoles } from "../../services/role-service"
import { useAppDispatch } from "../../utils/hooks"
import type { Role, RoleForm, UserForm } from "../../utils/interfaces"
import { Flex } from "../styles/flex"
import { createdRole } from "../../redux/role-slice"

export const AddRole = () => {
  const [visible, setVisible] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const dispatch = useAppDispatch()
  const initialValues: RoleForm = {
    role_name: "",
  }
  const validationSchema = Yup.object().shape({
    role_name: Yup.string().required("Required"),
  })
  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
    console.log("closed")
  }

  return (
    <div>
      <Button auto onClick={handler}>
        Add User
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Add new user
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: RoleForm) => {
              await dispatch(createdRole(values))
            }}
          >
            {({ handleBlur, handleChange, touched, errors }) => (
              <Form>
                <Flex
                  direction={"column"}
                  css={{
                    flexWrap: "wrap",
                    gap: "$8",
                    "@lg": { flexWrap: "nowrap", gap: "$12" },
                  }}
                >
                  <Flex
                    css={{
                      gap: "$10",
                      flexWrap: "wrap",
                      "@lg": { flexWrap: "nowrap" },
                    }}
                  >
                    <Flex direction={"column"}>
                      <Input
                        label="Role"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="Role"
                        name="role_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.role_name && touched.role_name ? (
                        <div style={{ color: "red" }}>{errors.role_name}</div>
                      ) : null}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider css={{ my: "$5" }} />
                <Button auto type="submit">
                  Add Role
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  )
}

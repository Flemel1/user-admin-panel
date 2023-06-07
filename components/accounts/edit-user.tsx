import { Button, Divider, Input, Modal, Radio, Text } from "@nextui-org/react"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { createdUser, updatedUser } from "../../redux/user-slice"
import { fetchRoles } from "../../services/role-service"
import { useAppDispatch } from "../../utils/hooks"
import type { EditUserProps, Role, UserForm } from "../../utils/interfaces"
import { Flex } from "../styles/flex"

export const EditUser = ({ user }: EditUserProps) => {
  const [visible, setVisible] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const dispatch = useAppDispatch()
  const initialValues: UserForm = {
    email: user.email,
    birthday: user.birthday,
    name: user.name,
    role_name: user.role.role_name,
    sex: user.sex,
    address: user.address,
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    birthday: Yup.string().required("Required"),
    role_name: Yup.string().required("Required"),
    sex: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  })
  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
    console.log("closed")
  }

  useEffect(() => {
    const fetched = async () => {
      const res = await fetchRoles()
      setRoles(res)
    }
    fetched()
  }, [])

  return (
    <div>
      <Button auto onClick={handler}>
        Update User
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
            onSubmit={async (values: UserForm) => {
              await dispatch(updatedUser({ dataForm: values, id: user.id }))
            }}
          >
            {({
              handleBlur,
              handleChange,
              touched,
              errors,
              values,
              setFieldValue,
            }) => (
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
                        label="Name"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </Flex>
                    <Flex direction={"column"}>
                      <Input
                        label="Email"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </Flex>
                  </Flex>

                  <Flex
                    css={{
                      gap: "$10",
                      flexWrap: "wrap",
                      "@lg": { flexWrap: "nowrap" },
                    }}
                  >
                    <Flex direction={"column"}>
                      <Input
                        label="Address"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Address"
                        name="address"
                        value={values.address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.address && touched.address ? (
                        <div style={{ color: "red" }}>{errors.address}</div>
                      ) : null}
                    </Flex>
                    <Flex direction={"column"}>
                      <Input
                        label="Birthday"
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Birthday"
                        name="birthday"
                        type="date"
                        value={values.birthday}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.birthday && touched.birthday ? (
                        <div style={{ color: "red" }}>{errors.birthday}</div>
                      ) : null}
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      gap: "$10",
                      "@lg": { flexWrap: "nowrap" },
                    }}
                  >
                    <Flex direction={"column"}>
                      <Radio.Group
                        label="Sex"
                        isRequired={true}
                        name="sex"
                        value={values.sex}
                        onBlur={handleBlur}
                        onChange={(sex) => setFieldValue("sex", sex)}
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                      </Radio.Group>
                      {errors.sex && touched.sex ? (
                        <div style={{ color: "red" }}>{errors.sex}</div>
                      ) : null}
                    </Flex>
                    <Flex direction={"column"}>
                      <Radio.Group
                        label="Role"
                        isRequired={true}
                        name="role_name"
                        orientation="horizontal"
                        css={{
                          width: "350px",
                          display: "flex",
                          "@lg": { flexWrap: "nowrap" },
                        }}
                        value={values.role_name}
                        onBlur={handleBlur}
                        onChange={(role) => setFieldValue("role_name", role)}
                      >
                        {roles.map((role) => (
                          <Radio value={role.role_name}>{role.role_name}</Radio>
                        ))}
                      </Radio.Group>
                      {errors.role_name && touched.role_name ? (
                        <div style={{ color: "red" }}>{errors.role_name}</div>
                      ) : null}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider css={{ my: "$5" }} />
                <Button auto type="submit">
                  Update User
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Add User
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}

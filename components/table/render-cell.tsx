import { Col, Row, Text, Tooltip, User } from "@nextui-org/react"
import React from "react"
import { useAppDispatch } from "../../utils/hooks"
import { User as user } from "../../utils/interfaces"
import { DeleteIcon } from "../icons/table/delete-icon"
import { EditIcon } from "../icons/table/edit-icon"
import { IconButton } from "./table.styled"
import { deleteUserById } from "../../redux/user-slice"
import { EditUser } from "../accounts/edit-user"

interface Props {
  user: user
  columnKey: string | React.Key
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const dispatch = useAppDispatch()
  // @ts-ignore
  switch (columnKey) {
    case "name":
      return (
        <User name={user.name} css={{ p: 0 }}>
          {user.email}
        </User>
      )
    case "role":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {user.role.role_name}
            </Text>
          </Row>
        </Col>
      )

    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <EditUser key={user.email} user={user} />
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={async () => dispatch(deleteUserById({ id: user.id }))}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      )
    case "address":
      return user.address
    case "birthday":
      return user.birthday
  }
}

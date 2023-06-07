import { Col, Row, Text } from "@nextui-org/react"
import React from "react"
import { roles } from "./data"
import { Role } from "../../utils/interfaces"

interface Props {
  role: Role
}

export const RenderRoleCell = ({ role }: Props) => {
  // @ts-ignore

  return (
    <Col>
      <Row>
        <Text b size={14} css={{ tt: "capitalize" }}>
          {role.role_name}
        </Text>
      </Row>
    </Col>
  )
}

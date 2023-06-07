import { Input, Loading, Text } from "@nextui-org/react"
import { useEffect } from "react"
import { fetchRoles } from "../../redux/role-slice"
import type { RootState } from "../../redux/store"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { Flex } from "../styles/flex"
import { TableRoles } from "../table/roles.-table"
import { AddRole } from "./add-role"

export const Roles = () => {
  const { roles, isLoading, page } = useAppSelector(
    (state: RootState) => state.role
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchAllUsers = async () => {
      await dispatch(fetchRoles(page))
    }
    fetchAllUsers()
  }, [isLoading, page])

  if (isLoading || roles.data.length === 0) {
    return <Loading />
  }
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Text h3>All User Roles</Text>
      <Flex
        css={{ gap: "$8" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Search roles"
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddRole />
        </Flex>
      </Flex>

      <TableRoles data={roles} />
    </Flex>
  )
}

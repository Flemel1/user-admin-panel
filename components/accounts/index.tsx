import { Button, Input, Loading, Text } from "@nextui-org/react"
import { useEffect } from "react"
import { RootState } from "../../redux/store"
import { changeSort, fetchUsers } from "../../redux/user-slice"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { Flex } from "../styles/flex"
import { TableWrapper } from "../table/table"
import { AddUser } from "./add-user"

export const Accounts = () => {
  const { users, isLoading, page, sort } = useAppSelector(
    (state: RootState) => state.user
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchAllUsers = async () => {
      await dispatch(fetchUsers({ page: page, sort: sort }))
    }
    fetchAllUsers()
  }, [isLoading, page, sort])

  if (isLoading || users.data.length === 0) {
    return <Loading />
  }

  const sorting = () => {
    if (sort === "asc") {
      dispatch(changeSort("desc"))
    } else if (sort === "desc") {
      dispatch(changeSort("asc"))
    }
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
      <Text h3>All Users</Text>
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
            placeholder="Search users"
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddUser />
          <Button auto onClick={sorting}>
            Sort {sort.toUpperCase()}
          </Button>
        </Flex>
      </Flex>

      <TableWrapper data={users} />
    </Flex>
  )
}

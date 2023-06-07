import { Table } from "@nextui-org/react"
import { Box } from "../styles/box"
import { roleColumns, roles } from "./data"
import { RenderRoleCell } from "./render-role-cell"
import { RolePagination } from "../../utils/interfaces"
import { useAppDispatch } from "../../utils/hooks"
import { changePage } from "../../redux/role-slice"

interface Props {
  data: RolePagination | null
}

export const TableRoles = ({ data }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
      >
        <Table.Header columns={roleColumns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={data?.data}>
          {(item) => (
            <Table.Row key={item.role_name}>
              {(columnKey) => (
                <Table.Cell>{RenderRoleCell({ role: item })}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          initialPage={data?.current_page}
          total={data?.total_pages}
          rowsPerPage={data?.data.length}
          onPageChange={(page) => dispatch(changePage(page))}
        />
      </Table>
    </Box>
  )
}

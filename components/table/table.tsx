import { Table } from "@nextui-org/react"
import { Box } from "../styles/box"
import { columns } from "./data"
import { RenderCell } from "./render-cell"
import type { UserPagination } from "../../utils/interfaces"
import { useAppDispatch } from "../../utils/hooks"
import { changePage } from "../../redux/user-slice"

interface Props {
  data: UserPagination | null
}

export const TableWrapper = ({ data }: Props) => {

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
        <Table.Header columns={columns}>
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
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({ user: item, columnKey: columnKey })}
                </Table.Cell>
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

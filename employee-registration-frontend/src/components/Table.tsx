import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridFeatureMode,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
type TableProps<T> = {
  rows: T[];
  columns: GridColDef[];
  isLoading?: boolean;
  checkboxSelection?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
  };
  onPaginationModelChange?: (pageModel: GridPaginationModel) => void;
  pageSizeOptions?: number[];
  initialState?: GridInitialStateCommunity;
  rowCount?: number;
  paginationMode?: GridFeatureMode | undefined;
  onRowClick?: GridEventListener<"rowClick"> | undefined;
};

export default function Table<T>({
  rows,
  columns,
  isLoading,
  checkboxSelection,
  onPaginationModelChange,
  pageSizeOptions,
  initialState,
  rowCount,
  paginationMode,
  onRowClick,
}: TableProps<T>) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        paginationMode={paginationMode}
        rowCount={rowCount}
        initialState={initialState}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        onPaginationModelChange={onPaginationModelChange}
        onRowClick={onRowClick}
      />
    </div>
  );
}

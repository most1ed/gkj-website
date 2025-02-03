import { Widget } from '../../types/dashboard.types';

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableWidgetProps {
  columns: TableColumn[];
  data: any[];
}

const TableWidget: React.FC<TableWidgetProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3">{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-100">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const memberListWidget: Widget = {
  id: 'member-list',
  type: 'table',
  title: 'Church Member List',
  category: 'Membership',
  component: () => (
    <TableWidget 
      columns={[
        { header: 'Name', accessor: 'name' },
        { header: 'Ministry', accessor: 'ministry' },
        { header: 'Join Date', accessor: 'joinDate' }
      ]}
      data={[
        { name: 'John Doe', ministry: 'Worship', joinDate: '2022-01-15' },
        { name: 'Jane Smith', ministry: 'Children', joinDate: '2021-11-20' },
        { name: 'Mike Johnson', ministry: 'Outreach', joinDate: '2023-03-10' }
      ]}
    />
  ),
  permissions: ['ADMIN', 'STAFF']
};

export const financeTransactionsWidget: Widget = {
  id: 'finance-transactions',
  type: 'table',
  title: 'Recent Transactions',
  category: 'Finance',
  component: () => (
    <TableWidget 
      columns={[
        { header: 'Date', accessor: 'date' },
        { header: 'Description', accessor: 'description' },
        { header: 'Amount', accessor: 'amount' }
      ]}
      data={[
        { date: '2024-01-15', description: 'Sunday Offering', amount: '$12,500' },
        { date: '2024-01-22', description: 'Building Fund', amount: '$5,200' },
        { date: '2024-01-29', description: 'Missions Support', amount: '$3,750' }
      ]}
    />
  ),
  permissions: ['TREASURER', 'ADMIN']
};

export default TableWidget;

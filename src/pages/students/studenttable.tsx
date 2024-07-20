import { Student } from '@/utils/data_interface';
import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

type SortConfig = {
    key: keyof Student;
    direction: 'ascending' | 'descending';
};

interface StudentTableProps {
    students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [filters, setFilters] = useState({
        search: ''
    });
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const handleSort = (key: keyof Student) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedStudents = React.useMemo(() => {
        let sortableStudents = [...students];
        if (sortConfig !== null) {
            sortableStudents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableStudents;
    }, [students, sortConfig]);

    const filteredStudents = sortedStudents.filter(student => {
        return (
            filters.search === '' ||
            Object.values(student).some(value =>
                value.toString().toLowerCase().includes(filters.search.toLowerCase())
            )
        );
    });

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b"></th>
                            {['id', 'firstname', 'lastname', 'dateOfBirth'].map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort(key as keyof Student)}
                                >
                                    <div className="flex items-center justify-between">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                        {sortConfig && sortConfig.key === key ? (
                                            sortConfig.direction === 'ascending' ? (
                                                <FaSortUp />
                                            ) : (
                                                <FaSortDown />
                                            )
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr
                                key={student.id}
                                className={`${
                                    selectedStudent === student.id ? 'bg-blue-100' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-gray-200 cursor-pointer`}
                                onClick={() => setSelectedStudent(student.id)}
                            >
                                <td className="px-4 py-2 border-b">
                                    <input type="checkbox" />
                                </td>
                                <td className="px-4 py-2 border-b">{student.id}</td>
                                <td className="px-4 py-2 border-b">{student.firstname}</td>
                                <td className="px-4 py-2 border-b">{student.lastname}</td>
                                <td className="px-4 py-2 border-b">{student.dateOfBirth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;

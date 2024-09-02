"use client"
import React, { useState, ChangeEvent } from 'react';
import jsPDF from 'jspdf';

interface DataItem {
    username: string;
    name: string;
    submissionLength: number;
    assignmentLength: number;
    score: number;
    submissionEvaluatedLength: number;
    attendance: string;
    mentorUsername: string;
  }
  const initialData: DataItem[] = [
    { username: '23071A0513', name: 'DUNE BHANU CHANDANA', submissionLength: 39, assignmentLength: 31, score: 379, submissionEvaluatedLength: 39, attendance: '100.00', mentorUsername: '22071A0531' },
    { username: '23071A0510', name: 'CHINTHA SAMPATH KUMAR', submissionLength: 37, assignmentLength: 30, score: 366, submissionEvaluatedLength: 37, attendance: '96.55', mentorUsername: '22071A0531' },
    { username: '23071A0548', name: 'RAGI VARSHINI REDDY', submissionLength: 37, assignmentLength: 28, score: 364, submissionEvaluatedLength: 37, attendance: '100.00', mentorUsername: '22071A0531' },
    { username: '23071A0508', name: 'CHANDA VISHWANATH RAJA', submissionLength: 37, assignmentLength: 31, score: 360, submissionEvaluatedLength: 37, attendance: '82.76', mentorUsername: '22071A0531' },
    { username: '23071A0546', name: 'POOJENDRA PALETI', submissionLength: 37, assignmentLength: 30, score: 359, submissionEvaluatedLength: 37, attendance: '27.59', mentorUsername: '22071A0531' },
    { username: '23071A0547', name: 'PRANATI RAO PINISETTI', submissionLength: 40, assignmentLength: 30, score: 359, submissionEvaluatedLength: 36, attendance: '100.00', mentorUsername: '22071A0531' },
    { username: '23071A0509', name: 'CHERUKU ANUDEEP REDDY', submissionLength: 36, assignmentLength: 29, score: 353, submissionEvaluatedLength: 36, attendance: '89.66', mentorUsername: '22071A0531' },
    { username: '23071A0545', name: 'PONNALA ABHINAVA CHAITANYA KUMAR', submissionLength: 36, assignmentLength: 29, score: 351, submissionEvaluatedLength: 36, attendance: '51.72', mentorUsername: '22071A0531' },
    { username: '23071A0503', name: 'AMANCHA AKSHAYA', submissionLength: 34, assignmentLength: 27, score: 333, submissionEvaluatedLength: 34, attendance: '100.00', mentorUsername: '22071A0531' },
  ];
const Page = () => {
    
    const [data, setData] = useState<DataItem[]>(initialData);
    const [sortColumn, setSortColumn] = useState<string>('username');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [selectedFormat, setSelectedFormat] = useState<string>('csv');
  
    const uniqueMentors = Array.from(new Set(data.map(item => item.mentorUsername)));
  
    const columnMapping: { [key: string]: keyof DataItem } = {
      'Username': 'username',
      'Name': 'name',
      'Submissions': 'submissionLength',
      'Assignments': 'assignmentLength',
      'Score': 'score',
      'Evaluated': 'submissionEvaluatedLength',
      'Attendance': 'attendance',
      'Mentor': 'mentorUsername',
    };
  
    const handleSort = (column: string) => {
      const key = columnMapping[column];
      if (!key) return;
  
      const order = sortColumn === key && sortOrder === 'asc' ? 'desc' : 'asc';
      const sortedData = [...data].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
      });
      setSortColumn(key);
      setSortOrder(order);
      setData(sortedData);
    };
  
    const handleMentorChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedMentor(e.target.value);
    };
  
    const handleFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedFormat(e.target.value);
    };
  
    const filteredData = selectedMentor
      ? data.filter(item => item.mentorUsername === selectedMentor)
      : data;
  
    const downloadCSV = () => {
      const headers = Object.keys(columnMapping);
      const rows = filteredData.map(item => 
        headers.map(header => {
          const key = columnMapping[header];
          return item[key] !== undefined ? item[key].toString() : '';
        })
      );
  
      const csvContent = [
        headers.join(','),
        ...rows.map(e => e.join(','))
      ].join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'FinalReport.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.text('Final Report', 8, 12);
  
      const headers = Object.keys(columnMapping);
      const tableData = filteredData.map(item =>
        headers.map(header => {
          const key = columnMapping[header];
          return item[key] !== undefined ? item[key].toString() : '';
        })
      );
  
      const pageWidth = doc.internal.pageSize.width;
      const margin = 8;
      const cellPadding = 5;
      const rowHeight = 10;
      const headerHeight = 10;
      
      const columnWidths = headers.map(header => {
        return Math.max(doc.getStringUnitWidth(header) * 1.5,25);
      });
      const tableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
      const tableX = margin;
      const tableY = 30;
      doc.setFontSize(8);
      doc.setFont("helvetica");
      let currentY = tableY;
      
      headers.forEach((header, index) => {
        doc.text(header, tableX + columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0), currentY);
      });
      
      currentY += headerHeight;
  
      doc.setFontSize(8);
      doc.setFont("helvetica");
      
      tableData.forEach(row => {
        row.forEach((cell, index) => {
          doc.text(cell, tableX + columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0), currentY);
        });
        currentY += rowHeight;
      });
      doc.save('FinalReport.pdf');
    };
  
    const handleDownload = () => {
      if (selectedFormat === 'csv') {
        downloadCSV();
      } else if (selectedFormat === 'pdf') {
        downloadPDF();
      }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
          <div className="flex justify-between mb-4">
              <div>
                <select
                id="mentor-select"
                title="mentor name"
                value={selectedMentor}
                onChange={handleMentorChange}
                className="p-2 text-sm text-gray-900 border rounded-lg bg-white"
                >
                <option value="">All Mentors</option>
                {uniqueMentors.map(mentor => (
                    <option key={mentor} value={mentor}>{mentor}</option>
                ))}
                </select>
              </div>
              <div>
                <select
                id="format-select"
                title="select format"
                value={selectedFormat}
                onChange={handleFormatChange}
                className="p-2 text-sm text-gray-900 border rounded-l-lg bg-white"
                >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                </select>
                <button 
                onClick={handleDownload}
                className="p-2 text-sm text-white rounded-r-lg bg-blue-500"
                >
                Download Report
                </button>
               </div>
          </div>
    
          <table className="w-full text-sm border-collapse">
            <thead className="text-xs bg-blue-500 text-white uppercase rounded-t-lg">
              <tr>
                {['Username', 'Name', 'Submissions', 'Assignments', 'Score', 'Evaluated', 'Attendance', 'Mentor'].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-5 py-3 cursor-pointer border-b border-gray-300 dark:border-gray-500 truncate"
                  >
                    {column}
                    {sortColumn === columnMapping[column] && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className={`bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:bg-gray-800`}>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.username}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.name}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.submissionLength}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.assignmentLength}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.score}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.submissionEvaluatedLength}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.attendance}</td>
                  <td className="px-5 py-3 border-b border-gray-300 dark:border-gray-700 truncate">{row.mentorUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default Page





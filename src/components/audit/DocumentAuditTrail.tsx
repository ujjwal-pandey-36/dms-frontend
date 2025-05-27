import React, { useState } from 'react';
import { Document, AuditEntry } from '../../types/Document';
import { format } from 'date-fns';
import { Clock, Search, UserCircle, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentAuditTrailProps {
  document: Document;
}

const DocumentAuditTrail: React.FC<DocumentAuditTrailProps> = ({ document }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' });
  
  // Combine audit entries from document and changes from change history
  const allAuditEntries: AuditEntry[] = [
    ...document.auditTrail,
    ...document.activity.map(activity => ({
      id: `activity-${activity.timestamp}`,
      documentId: document.id,
      userId: activity.userId,
      userName: activity.userName,
      action: activity.action,
      timestamp: activity.timestamp,
      changes: []
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Filter entries based on search and filters
  const filteredEntries = allAuditEntries.filter(entry => {
    // Search term filter
    if (searchTerm && !entry.action.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !entry.userName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // User filter
    if (selectedUser && entry.userId !== selectedUser) {
      return false;
    }
    
    // Action filter
    if (selectedAction && !entry.action.includes(selectedAction)) {
      return false;
    }
    
    // Date range filter
    if (dateRange.from && new Date(entry.timestamp) < new Date(dateRange.from)) {
      return false;
    }
    if (dateRange.to && new Date(entry.timestamp) > new Date(dateRange.to)) {
      return false;
    }
    
    return true;
  });
  
  // Get unique users and actions for filters
  const uniqueUsers = Array.from(new Set(allAuditEntries.map(entry => entry.userId)));
  const uniqueUserNames = Array.from(new Set(allAuditEntries.map(entry => entry.userName)));
  const uniqueActions = Array.from(new Set(allAuditEntries.map(entry => {
    const action = entry.action.split(' ')[0]; // Get the verb
    return action;
  })));
  
  // Group entries by date
  const entriesByDate: { [date: string]: AuditEntry[] } = {};
  filteredEntries.forEach(entry => {
    const date = format(new Date(entry.timestamp), 'yyyy-MM-dd');
    if (!entriesByDate[date]) {
      entriesByDate[date] = [];
    }
    entriesByDate[date].push(entry);
  });
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedUser(null);
    setSelectedAction(null);
    setDateRange({ from: '', to: '' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Audit Trail</h2>
        <p className="text-sm text-gray-500 mt-1">
          View the complete history of changes to this document
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div>
              <label htmlFor="user-filter" className="block text-xs font-medium text-gray-700 mb-1">
                User
              </label>
              <select
                id="user-filter"
                className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={selectedUser || ''}
                onChange={(e) => setSelectedUser(e.target.value || null)}
              >
                <option value="">All Users</option>
                {uniqueUsers.map((userId, index) => (
                  <option key={userId} value={userId}>
                    {uniqueUserNames[index]}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="action-filter" className="block text-xs font-medium text-gray-700 mb-1">
                Action Type
              </label>
              <select
                id="action-filter"
                className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={selectedAction || ''}
                onChange={(e) => setSelectedAction(e.target.value || null)}
              >
                <option value="">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="date-from" className="block text-xs font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="date-from"
                  className="block w-full px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="date-to" className="block text-xs font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  id="date-to"
                  className="block w-full px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
              </div>
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Audit trail timeline */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-350px)]">
        {Object.keys(entriesByDate).length > 0 ? (
          Object.keys(entriesByDate).sort().reverse().map(date => (
            <div key={date} className="mb-8 last:mb-0">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                {format(new Date(date), 'MMMM d, yyyy')}
              </h3>
              
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {entriesByDate[date].map((entry, entryIndex) => (
                    <div key={entry.id} className="relative pl-10 animate-fade-in">
                      <div className="absolute left-0 top-0 mt-1.5 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center z-10">
                        <UserCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div>
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{entry.userName}</span> {entry.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(new Date(entry.timestamp), 'h:mm a')}
                          </p>
                        </div>
                        
                        {entry.changes && entry.changes.length > 0 && (
                          <div className="mt-3 sm:mt-0 bg-gray-50 p-3 rounded-md max-w-md">
                            <p className="text-xs font-medium text-gray-700 mb-2">Changes:</p>
                            <div className="space-y-2">
                              {entry.changes.map((change, changeIndex) => (
                                <div key={changeIndex} className="text-xs">
                                  <span className="text-gray-700">{change.field}: </span>
                                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 mt-1">
                                    <div className="bg-red-50 p-1 rounded text-red-800 line-through">
                                      {change.oldValue}
                                    </div>
                                    <div className="hidden sm:block text-gray-400">→</div>
                                    <div className="bg-green-50 p-1 rounded text-green-800">
                                      {change.newValue}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No audit records found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || selectedUser || selectedAction || dateRange.from || dateRange.to
                ? 'Try adjusting your filters'
                : 'Changes to this document will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentAuditTrail;
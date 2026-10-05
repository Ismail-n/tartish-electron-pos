import React, { useMemo, useState } from "react";
import RiyalIcon from "./RiyalIcon.jsx";
import "../styles/TransactionHistoryPage.scss";

const INITIAL_TRANSACTIONS = [
  {
    id: "TR-98412",
    time: "09:36 AM",
    customer: "Ahmed Al Rashid",
    plate: "RSD 2481 · KSA",
    service: "Clean Wash",
    method: "Tap to Pay",
    amount: 110.0,
    status: "completed",
  },
  {
    id: "TR-98411",
    time: "09:18 AM",
    customer: "Walk-in Customer",
    plate: "ABC 1234 · KSA",
    service: "Protect Wash",
    method: "Cash",
    amount: 72.0,
    status: "completed",
  },
  {
    id: "TR-98410",
    time: "08:54 AM",
    customer: "Sara K. Alotaibi",
    plate: "KSA 9082 · KSA",
    service: "Protect Wash",
    method: "Mada",
    amount: 120.0,
    status: "completed",
  },
  {
    id: "TR-98409",
    time: "08:31 AM",
    customer: "Mohammed Al Farsi",
    plate: "DRS 5678 · KSA",
    service: "Interior add-on",
    method: "Tap to Pay",
    amount: 78.0,
    status: "refunded",
  },
  {
    id: "TR-98408",
    time: "08:07 AM",
    customer: "Yousef Al-Harbi",
    plate: "JED 4410 · KSA",
    service: "Clean Wash",
    method: "Apple Pay",
    amount: 68.0,
    status: "completed",
  },
];

const STATUS_LABELS = {
  completed: "Completed",
  refunded: "Refunded",
};

export default function TransactionHistoryPage({
  stationName = "Al-Aarid",
  transactions = INITIAL_TRANSACTIONS,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {
    const todaysCount = transactions.length;
    const grossSales = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    const averageTicket = todaysCount ? grossSales / todaysCount : 0;
    const refunds = transactions
      .filter((t) => t.status === "refunded")
      .reduce((sum, t) => sum + t.amount, 0);
    return { todaysCount, grossSales, averageTicket, refunds };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      const matchesQuery =
        !query ||
        t.id.toLowerCase().includes(query) ||
        t.customer.toLowerCase().includes(query) ||
        t.plate.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [transactions, searchQuery, statusFilter]);

  return (
    <div className="transactionHistoryPage">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Recent Transactions</h1>
          <p className="pageSubtitle">
            Review all payments processed at Tartish {stationName} today.
          </p>
        </div>
      </div>

      <div className="statTileRow">
        <div className="statTile">
          <div className="statTileHeader">
            <span className="statTileLabel">Today's transactions</span>
            <span className="statTileDot statTileDot--blue" />
          </div>
          <span className="statTileValue">{stats.todaysCount}</span>
        </div>
        <div className="statTile">
          <div className="statTileHeader">
            <span className="statTileLabel">Gross sales</span>
            <span className="statTileDot statTileDot--green" />
          </div>
          <span className="statTileValue">{stats.grossSales.toFixed(2)}</span>
        </div>
        <div className="statTile">
          <div className="statTileHeader">
            <span className="statTileLabel">Average ticket</span>
            <span className="statTileDot statTileDot--pink" />
          </div>
          <span className="statTileValue">{stats.averageTicket.toFixed(2)}</span>
        </div>
        <div className="statTile">
          <div className="statTileHeader">
            <span className="statTileLabel">Refunds</span>
            <span className="statTileDot statTileDot--orange" />
          </div>
          <span className="statTileValue">{stats.refunds.toFixed(2)}</span>
        </div>
      </div>

      <div className="transactionToolbar">
        <div className="searchInputWrapper">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="searchIcon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="searchInput"
            placeholder="Search transaction, customer or plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="toolbarSelectWrapper">
          <select className="toolbarSelect" defaultValue="today">
            <option value="today">Today · 27 Aug</option>
          </select>
        </div>

        <div className="toolbarSelectWrapper">
          <select
            className="toolbarSelect"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="transactionTableWrapper">
        <table className="transactionTable">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="txCell">
                    <span className="txId">#{t.id}</span>
                    <span className="txTime">{t.time}</span>
                  </div>
                </td>
                <td>
                  <div className="txCell">
                    <span className="txCustomer">{t.customer}</span>
                    <span className="txPlate">{t.plate}</span>
                  </div>
                </td>
                <td className="txService">{t.service}</td>
                <td className="txMethod">{t.method}</td>
                <td className="txAmount">
                  <RiyalIcon width={12} height={13} /> {t.amount.toFixed(2)}
                </td>
                <td>
                  <span className={`statusBadge statusBadge--${t.status}`}>
                    {STATUS_LABELS[t.status]}
                  </span>
                </td>
                <td className="txActions">
                  <button type="button" className="txActionsBtn" aria-label="More actions">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="5" cy="12" r="1.8" />
                      <circle cx="12" cy="12" r="1.8" />
                      <circle cx="19" cy="12" r="1.8" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td className="txEmpty" colSpan={7}>
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

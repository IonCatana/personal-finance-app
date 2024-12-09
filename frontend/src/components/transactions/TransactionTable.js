import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import TransactionRow from "@components/transactions/TransactionRow";
import CustomPagination from "@components/transactions/CustomPagination";
import { useTheme } from "@mui/material/styles";

/**
 * TransactionTable Component
 *
 * Visualizza una tabella contenente transazioni con intestazioni per destinatario/mittente,
 * categoria, data e importo. Include paginazione personalizzata per navigare tra le transazioni.
 *
 * Props:
 * - `transactions` (array, obbligatorio): Elenco delle transazioni da visualizzare.
 *    - Ogni elemento deve contenere almeno:
 *      - `_id` (string): Identificatore unico della transazione.
 *      - `avatar` (string): Percorso o URL dell'immagine associata.
 *      - `name` (string): Nome del destinatario o mittente.
 *      - `category` (string): Categoria della transazione.
 *      - `date` (string): Data della transazione in formato ISO 8601 o compatibile con `Date`.
 *      - `amount` (number): Importo della transazione.
 * - `page` (number, obbligatorio): Pagina attualmente visualizzata.
 * - `rowsPerPage` (number, obbligatorio): Numero di righe visualizzate per pagina.
 * - `handleChangePage` (function, obbligatorio): Funzione per cambiare la pagina.
 * - `handleChangeRowsPerPage` (function, opzionale): Funzione per cambiare il numero di righe per pagina.
 *
 * Comportamento:
 * - Mostra i dettagli di ciascuna transazione utilizzando il componente `TransactionRow`.
 * - Mostra un messaggio "No transactions found" se non ci sono transazioni disponibili.
 * - Supporta la navigazione tra pagine tramite il componente `CustomPagination`.
 * - Personalizza l'aspetto delle intestazioni e delle righe della tabella in base al tema.
 *
 * Esempio:
 * <TransactionTable
 *   transactions={[
 *     { _id: "1", name: "Jane Doe", avatar: "/img.jpg", category: "Dining", date: "2024-06-15", amount: -45.99 },
 *   ]}
 *   page={0}
 *   rowsPerPage={5}
 *   handleChangePage={(event, newPage) => console.log(newPage)}
 * />
 *
 * Note:
 * - La paginazione è gestita tramite il componente `CustomPagination` che consente una navigazione semplice e personalizzabile.
 * - Il layout della tabella è ottimizzato per diverse dimensioni dello schermo utilizzando breakpoint responsivi.
 */

const TransactionTable = ({
  transactions,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const theme = useTheme();
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  return (
    <>
      <TableContainer
        sx={{
          marginBottom: pxToRem(32),
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: 0,
                  display: { xs: "none", sm: "table-cell" },
                }}>
                <Typography
                  sx={{
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                    padding: {
                      xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                        16
                      )} ${pxToRem(0)}`,
                      sm: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                        21
                      )} ${pxToRem(0)}`,
                      md: `${pxToRem(21)} ${pxToRem(16)}`,
                    },
                  }}>
                  Recipient / Sender
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: 0,
                  display: { xs: "none", sm: "table-cell" },
                }}>
                <Typography
                  sx={{
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                    padding: {
                      xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                        16
                      )} ${pxToRem(0)}`,
                      sm: `${pxToRem(21)} ${pxToRem(16)}`,
                      md: `${pxToRem(21)} ${pxToRem(16)}`,
                    },
                  }}>
                  Category
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: 0,
                  display: { xs: "none", sm: "table-cell" },
                }}>
                <Typography
                  sx={{
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                    padding: {
                      xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                        16
                      )} ${pxToRem(0)}`,
                      sm: `${pxToRem(21)} ${pxToRem(16)}`,
                      md: `${pxToRem(21)} ${pxToRem(16)}`,
                    },
                  }}>
                  Transaction Date
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: 0,
                  display: { xs: "none", sm: "table-cell" },
                  textAlign: "right",
                }}>
                <Typography
                  sx={{
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                    padding: {
                      xs: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(
                        16
                      )} ${pxToRem(16)}`,
                      sm: `${pxToRem(21)} ${pxToRem(0)} ${pxToRem(
                        21
                      )} ${pxToRem(16)}`,
                      md: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                        21
                      )} ${pxToRem(16)}`,
                    },
                  }}>
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TransactionRow
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No transactions found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </>
  );
};

export default TransactionTable;

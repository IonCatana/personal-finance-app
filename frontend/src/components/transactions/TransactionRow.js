import React from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * TransactionRow Component
 *
 * Rappresenta una riga di tabella per una singola transazione con dettagli quali avatar,
 * nome del destinatario/mittente, categoria, data, e importo.
 *
 * Props:
 * - `transaction` (object, obbligatorio): Dati della transazione.
 *    - `avatar` (string): URL o percorso dell'immagine associata alla transazione.
 *    - `name` (string): Nome del destinatario o mittente della transazione.
 *    - `category` (string): Categoria della transazione.
 *    - `date` (string): Data della transazione in formato ISO 8601 o compatibile con `Date`.
 *    - `amount` (number): Importo della transazione. Positivo per entrate, negativo per spese.
 * - `sx` (object, opzionale): Stile personalizzato da applicare alla riga della tabella.
 *
 * Comportamento:
 * - Mostra un'immagine avatar con stile circolare.
 * - Visualizza nome, categoria, data e importo della transazione.
 * - Usa colori distinti per l'importo: verde per entrate e rosso per spese.
 * - Adatta la visibilità della categoria e della data su schermi piccoli.
 *
 * Esempio:
 * <TransactionRow
 *   transaction={{
 *     avatar: "https://example.com/avatar.jpg",
 *     name: "Jane Doe",
 *     category: "Dining Out",
 *     date: "2024-06-15T12:00:00Z",
 *     amount: -25.50,
 *   }}
 *   sx={{ backgroundColor: "#f9f9f9" }}
 * />
 */

const TransactionRow = ({ transaction, sx = {} }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        sx={{
          padding: {
            xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(0)}`,
            sm: `${pxToRem(16)} ${pxToRem(0)}`,
            md: `${pxToRem(16)} ${pxToRem(16)}`,
          },
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={transaction.avatar}
            alt={transaction.name}
            style={{
              width: pxToRem(40),
              height: pxToRem(40),
              borderRadius: "50%",
              marginRight: pxToRem(16),
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: pxToRem(14),
                fontWeight: "bold",
                color: theme.palette.grey[900],
              }}>
              {transaction.name}
            </Typography>
            <Typography
              sx={{
                display: { xs: "flex", sm: "none" },
                marginTop: { xs: pxToRem(4) },
                fontSize: pxToRem(12),
                color: theme.palette.grey[500],
              }}>
              {transaction.category}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
          padding: `${pxToRem(16)} ${pxToRem(16)}`,
          fontSize: pxToRem(12),
          color: theme.palette.grey[500],
        }}>
        {transaction.category}
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
          padding: `${pxToRem(16)} ${pxToRem(16)}`,
          fontSize: pxToRem(12),
          color: theme.palette.grey[500],
        }}>
        {format(new Date(transaction.date), "dd MMM yyyy")}
      </TableCell>
      <TableCell
        sx={{
          padding: {
            xs: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)}`,
            sm: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)}`,
            md: `${pxToRem(16)} ${pxToRem(16)}`,
          },
          fontSize: pxToRem(14),
          fontWeight: "bold",
          color:
            transaction.amount >= 0
              ? theme.palette.secondaryColors.green
              : theme.palette.secondaryColors.red,
          textAlign: "right",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
          <Typography
            sx={{
              fontSize: pxToRem(14),
              fontWeight: "bold",
            }}>
            {transaction.amount >= 0 ? "+" : ""}
            {transaction.amount.toFixed(2)} €
          </Typography>
          <Typography
            sx={{
              display: { xs: "flex", sm: "none" },
              marginTop: { xs: pxToRem(4) },
              fontSize: pxToRem(12),
              color: theme.palette.grey[500],
            }}>
            {format(new Date(transaction.date), "dd MMM yyyy")}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;

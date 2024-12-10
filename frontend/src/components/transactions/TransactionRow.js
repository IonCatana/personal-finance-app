import React from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { format, isBefore } from "date-fns";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * TransactionRow Component
 *
 * Ora aggiungiamo le props per nascondere le colonne:
 * - hideRecipient (boolean)
 * - hideCategory (boolean)
 * - hideDate (boolean)
 * - hideAmount (boolean)
 */

const TransactionRow = ({
  transaction,
  sx = {},
  hideRecipient = false,
  hideCategory = false,
  hideDate = false,
  hideAmount = false,
  hideTransactionDueDate = false,
}) => {
  const theme = useTheme();

  const transactionDate = new Date(transaction.date);
  const today = new Date();

  const isPast = isBefore(transactionDate, today);

  let textColor;
  let icon = null; // nessuna icona di default

  if (isPast) {
    // Data passata
    if (transaction.recurring) {
      // Ricorrente + Passata
      textColor = theme.palette.secondaryColors.green;
      // Icona di conferma, supponiamo un check (adatta l'icona in base a quello che hai)
      icon = (
        <svg
          fill="none"
          height="14"
          viewBox="0 0 14 14"
          width="14"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="m7 .5c-1.28558 0-2.54228.381218-3.6112 1.09545-1.06892.71423-1.90204 1.72939-2.394014 2.91711-.49197 1.18772-.620691 2.49465-.369887 3.75553.250804 1.26087.869871 2.41911 1.778911 3.32811s2.06723 1.5281 3.32811 1.7789c1.26087.2508 2.56781.1221 3.75552-.3699 1.18776-.492 2.20286-1.3251 2.91716-2.394.7142-1.06891 1.0954-2.32562 1.0954-3.6112-.0018-1.72335-.6872-3.37559-1.9058-4.59418-1.2186-1.2186-2.87085-1.904-4.5942-1.90582zm2.85375 5.35375-3.5 3.5c-.04643.04649-.10158.08337-.16228.10853s-.12576.03811-.19147.03811c-.0657 0-.13077-.01295-.19147-.03811s-.11584-.06204-.16228-.10853l-1.5-1.5c-.09382-.09382-.14653-.22107-.14653-.35375s.05271-.25993.14653-.35375.22107-.14653.35375-.14653.25993.05271.35375.14653l1.14625 1.14688 3.14625-3.14688c.04646-.04646.10161-.08331.1623-.10845.0607-.02514.12576-.03808.19145-.03808.0657 0 .13075.01294.19145.03808s.11585.06199.1623.10845c.04646.04645.08331.10161.10845.1623.02514.0607.0381.12575.0381.19145s-.01296.13075-.0381.19145c-.02514.06069-.06199.11585-.10845.1623z"
            fill="#277c78"
          />
        </svg>
      );
    } else {
      // Non ricorrente + Passata
      textColor = theme.palette.grey[900];
      // Icona di avviso
      icon = (
        <svg
          fill="none"
          height="14"
          viewBox="0 0 14 14"
          width="14"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="m7 .5c-1.28558 0-2.54228.381218-3.6112 1.09545-1.06892.71423-1.90204 1.72939-2.394014 2.91711-.49197 1.18772-.620691 2.49465-.369887 3.75553.250804 1.26087.869871 2.41911 1.778911 3.32811s2.06723 1.5281 3.32811 1.7789c1.26087.2508 2.56781.1221 3.75552-.3699 1.18776-.492 2.20286-1.3251 2.91716-2.394.7142-1.06891 1.0954-2.32562 1.0954-3.6112-.0018-1.72335-.6872-3.37559-1.9058-4.59418-1.2186-1.2186-2.87085-1.904-4.5942-1.90582zm-.5 3.5c0-.13261.05268-.25979.14645-.35355.09377-.09377.22094-.14645.35355-.14645s.25979.05268.35356.14645c.09376.09376.14644.22094.14644.35355v3.5c0 .13261-.05268.25979-.14644.35355-.09377.09377-.22095.14645-.35356.14645s-.25978-.05268-.35355-.14645c-.09377-.09376-.14645-.22094-.14645-.35355zm.5 6.5c-.14833 0-.29334-.044-.41667-.1264-.12334-.0824-.21947-.1995-.27624-.3366-.05676-.13703-.07162-.28783-.04268-.43332.02894-.14548.10037-.27912.20526-.38401s.23853-.17632.38401-.20526c.14549-.02894.29629-.01408.43333.04268.13705.05677.25418.1529.33659.27623.08242.12334.1264.26834.1264.41668 0 .19891-.07902.3897-.21967.5303-.14065.1407-.33141.2197-.53033.2197z"
            fill="#c94736"
          />
        </svg>
      );
    }
  } else {
    // Data futura
    if (transaction.recurring) {
      // Ricorrente + Futura
      textColor = theme.palette.secondaryColors.green;
      // Nessuna icona, è solo programmata
    } else {
      // Non ricorrente + Futura
      textColor = theme.palette.grey[900]; // o un colore neutro
      // Nessuna icona
    }
  }

  function getOrdinalSuffix(day) {
    const d = parseInt(day, 10);
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <TableRow sx={sx}>
      {/* Recipient / Sender cell */}
      {!hideRecipient && (
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
              {!hideCategory && (
                <Typography
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    marginTop: { xs: pxToRem(4) },
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                  }}>
                  {transaction.category}
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
      )}

      {/* Category cell */}
      {!hideCategory && (
        <TableCell
          sx={{
            display: { xs: "none", sm: "table-cell" },
            padding: `${pxToRem(16)} ${pxToRem(16)}`,
            fontSize: pxToRem(12),
            color: theme.palette.grey[500],
          }}>
          {transaction.category}
        </TableCell>
      )}

      {/* Date cell */}
      {!hideDate && (
        <TableCell
          sx={{
            display: { xs: "none", sm: "table-cell" },
            padding: `${pxToRem(16)} ${pxToRem(16)}`,
            fontSize: pxToRem(12),
            color: theme.palette.grey[500],
          }}>
          {format(new Date(transaction.date), "dd MMM yyyy")}
        </TableCell>
      )}

      {/* TransactionDueDate cell */}
      {!hideTransactionDueDate && (
        <TableCell
          sx={{
            display: { xs: "none", sm: "table-cell" },
            padding: `${pxToRem(16)} ${pxToRem(16)}`,
            fontSize: pxToRem(12),
            color: theme.palette.grey[500],
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: pxToRem(8),
            }}>
            <Typography
              sx={{
                color: textColor,
              }}>
              {transaction.recurring
                ? `Monthly - ${format(transactionDate, "d")}${getOrdinalSuffix(
                    format(transactionDate, "d")
                  )}`
                : format(transactionDate, "dd MMM yyyy")}
            </Typography>
            {icon && icon}
          </Box>
        </TableCell>
      )}

      {/* Amount cell */}
      {!hideAmount && (
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
            {!hideDate && (
              <Typography
                sx={{
                  display: { xs: "flex", sm: "none" },
                  marginTop: { xs: pxToRem(4) },
                  fontSize: pxToRem(12),
                  color: theme.palette.grey[500],
                }}>
                {format(new Date(transaction.date), "dd MMM yyyy")}
              </Typography>
            )}
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TransactionRow;

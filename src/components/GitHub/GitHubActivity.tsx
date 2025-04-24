import React, { useEffect, useState } from "react";
import styles from "./GitHubActivity.module.scss";

interface GitHubActivityProps {
  username: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 для интенсивности цвета
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubStats {
  totalContributions: number;
  streak: number;
  maxStreak: number;
  averagePerDay: number;
  mostActiveDay: {
    date: string;
    count: number;
  };
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({ username }) => {
  const [contributionData, setContributionData] = useState<ContributionWeek[]>(
    []
  );
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    streak: 0,
    maxStreak: 0,
    averagePerDay: 0,
    mostActiveDay: {
      date: "",
      count: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        setLoading(true);

        // GitHub GraphQL API запрос для получения вкладов пользователя
        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""
            }`,
          },
          body: JSON.stringify({
            query,
            variables: { username },
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const calendarData =
          result.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendarData) {
          throw new Error("Не удалось получить данные о вкладах");
        }

        // Преобразование данных в нужный формат
        const weeks: ContributionWeek[] = [];
        const totalContributions = calendarData.totalContributions;
        let currentStreak = 0;
        let maxStreak = 0;
        let totalDays = 0;
        let mostActiveDay = { date: "", count: 0 };

        calendarData.weeks.forEach(
          (week: {
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              color: string;
            }>;
          }) => {
            const days: ContributionDay[] = [];

            week.contributionDays.forEach(
              (day: {
                date: string;
                contributionCount: number;
                color: string;
              }) => {
                const count = day.contributionCount;

                // Определяем уровень (интенсивность) для отображения
                let level = 0;
                if (count > 0) {
                  if (count <= 2) level = 1;
                  else if (count <= 5) level = 2;
                  else if (count <= 8) level = 3;
                  else level = 4;

                  // Обновление данных о серии вкладов
                  currentStreak++;
                  if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                  }
                } else {
                  // Сброс серии
                  currentStreak = 0;
                }

                totalDays++;

                // Обновляем информацию о самом активном дне
                if (count > mostActiveDay.count) {
                  mostActiveDay = { date: day.date, count };
                }

                days.push({
                  date: day.date,
                  count,
                  level,
                });
              }
            );

            weeks.push({ days });
          }
        );

        // Берем только последние 52 недели (год)
        const lastYearWeeks = weeks.slice(-52);

        // Рассчитываем статистику
        const averagePerDay =
          totalDays > 0 ? totalContributions / totalDays : 0;

        setContributionData(lastYearWeeks);
        setStats({
          totalContributions,
          streak: currentStreak,
          maxStreak,
          averagePerDay,
          mostActiveDay,
        });
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при получении данных GitHub:", err);
        setError(err instanceof Error ? err.message : "Произошла ошибка");
        setLoading(false);
      }
    };

    fetchGitHubContributions();
  }, [username]);

  // Форматируем дату для отображения
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.githubActivityWrapper}>
      <div className={styles.contributionGraphContainer}>
        <div className={styles.contributionGraph}>
          {contributionData.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`${styles.day} ${styles[`level${day.level}`]}`}
                  title={`${formatDate(day.date)}: ${day.count} контрибуций`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.profileLink}>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{username} • {stats.totalContributions} контрибуций за последний
            год
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubActivity;

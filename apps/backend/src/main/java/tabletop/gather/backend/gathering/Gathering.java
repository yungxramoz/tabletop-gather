package tabletop.gather.backend.gathering;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tabletop.gather.backend.guest.Guest;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.user.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "Gatherings")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Gathering {

    @Id
    @Column(nullable = false, updatable = false)
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "uuid")
    private UUID id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToMany
    @JoinTable(
            name = "GatheringGuests",
            joinColumns = @JoinColumn(name = "gatheringId"),
            inverseJoinColumns = @JoinColumn(name = "guestId")
    )
    private Set<Guest> guests;

    @ManyToMany
    @JoinTable(
            name = "GatheringUsers",
            joinColumns = @JoinColumn(name = "gatheringId"),
            inverseJoinColumns = @JoinColumn(name = "userId")
    )
    private Set<User> users;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

}
